import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}))

app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Sign up new user
app.post('/make-server-11fde674/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json()
    
    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (error) {
      console.log(`Signup error: ${error.message}`)
      return c.json({ error: error.message }, 400)
    }

    return c.json({ user: data.user })
  } catch (error) {
    console.log(`Signup error: ${error}`)
    return c.json({ error: 'Internal server error during signup' }, 500)
  }
})

// Get process data
app.get('/make-server-11fde674/process', async (c) => {
  try {
    const processData = await kv.get('ebay_process_data')
    
    if (!processData) {
      // Return default process data if none exists
      const defaultData = {
        title: "The Process of Listing and Processing Products on eBay",
        subtitle: "(Sales Team)",
        mainSteps: [
          {
            id: "1",
            title: "1) Intake & Qualification",
            steps: [
              "Receive request",
              "Quick QC - Check"
            ],
            color: "border-l-blue-500",
            iconName: "Inbox"
          },
          {
            id: "2",
            title: "2) Listing Preparation", 
            steps: [
              "Normalize Photos",
              "Draft Listing",
              "Map SKU/ID",
              "Set Commercials"
            ],
            color: "border-l-purple-500",
            iconName: "FileText"
          },
          {
            id: "3",
            title: "3) Publish & Optimize/Publish on eBay",
            steps: [
              "Live Verify (Desktop & Mobile)",
              "Monitor Early Signals (Day 1-5)",
              "Tune If Needed"
            ],
            color: "border-l-green-500",
            iconName: "Globe"
          },
          {
            id: "4",
            title: "4) Buyer Communication (Ongoing)",
            steps: [
              "Respond <24h - Answer questions; re-confirm critical info (condition, ship window)",
              "Sync the Listing - If a clarification changes accuracy, update the listing and note it in the change log"
            ],
            color: "border-l-orange-500",
            iconName: "MessageCircle"
          }
        ],
        branchPaths: [
          {
            id: "5",
            title: "5) Sold Path (Handoff to Technical)",
            status: "SOLD",
            steps: [
              "Prepare Sale Report and check customer detail and shipping information",
              "Archive Tracking - After dispatch, save tracking/label to the item folder"
            ],
            color: "border-l-green-600",
            iconName: "Package"
          },
          {
            id: "6",
            title: "6) Aging / Unsold Path (Disposition)",
            status: "UNSOLD",
            steps: [
              "If the product threshold reached day 30 mark item unable to sell via the designated link",
              "Submit to Material manager for Decision"
            ],
            color: "border-l-orange-600",
            iconName: "Clock"
          }
        ],
        lastModified: new Date().toISOString(),
        modifiedBy: "system"
      }
      
      await kv.set('ebay_process_data', defaultData)
      return c.json(defaultData)
    }
    
    return c.json(processData)
  } catch (error) {
    console.log(`Get process error: ${error}`)
    return c.json({ error: 'Failed to retrieve process data' }, 500)
  }
})

// Update process data
app.put('/make-server-11fde674/process', async (c) => {
  try {
    const processData = await c.req.json()
    
    // Add modification metadata
    processData.lastModified = new Date().toISOString()
    processData.modifiedBy = processData.user || 'Anonymous User'
    
    await kv.set('ebay_process_data', processData)
    
    return c.json({ success: true, data: processData })
  } catch (error) {
    console.log(`Update process error: ${error}`)
    return c.json({ error: 'Failed to update process data' }, 500)
  }
})

// Get process history
app.get('/make-server-11fde674/process/history', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const history = await kv.getByPrefix('ebay_process_history_')
    return c.json(history)
  } catch (error) {
    console.log(`Get history error: ${error}`)
    return c.json({ error: 'Failed to retrieve process history' }, 500)
  }
})

// Save process version to history
app.post('/make-server-11fde674/process/save-version', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { processData, versionName } = await c.req.json()
    
    const versionKey = `ebay_process_history_${Date.now()}`
    const versionData = {
      ...processData,
      versionName: versionName || `Version ${new Date().toLocaleString()}`,
      savedAt: new Date().toISOString(),
      savedBy: user.user_metadata?.name || user.email
    }
    
    await kv.set(versionKey, versionData)
    
    return c.json({ success: true, versionKey })
  } catch (error) {
    console.log(`Save version error: ${error}`)
    return c.json({ error: 'Failed to save process version' }, 500)
  }
})

Deno.serve(app.fetch)