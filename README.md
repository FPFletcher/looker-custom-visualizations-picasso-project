![Project_Picasso_banner](./99_ASSETS/Project_Picasso_banner/png)
# looker-custom-visualizations
List of free Javascript visuals you can import within your own Looker instance



# Looker Dashboard Summarization

This is an extension or plugin for Looker that integrates LLM's hosted on Vertex AI into a streaming dashboard summarization experience powered by Websockets.

![STUDIO Treemap visualization](./99_ASSETS/STUDIO_treemap.gif)

# Description

The Dashboard Summarization extension can be broken down into 3 parts:

- **Summarization**
  - Generates concise summaries on your dashboard's data
- **Prescription**
  - Grounded in your dashboard's data, it can prescribe operational actions and point out outliers
- **Action**
  - Leveraging Looker's API, insights can be exported into the business tools your organization uses

Additionally, the extension provides:

- Google Chat Export (Oauth integration to export the summary to Google Chat)
- Slack Export (Oauth integration to export the summary to Slack in rich text)
- Custom Summary Prompts (Ability to provide specific guidance for summary generation)
- Summary Regeneration (Regenerate summaries with different styles or focuses)
- Queries run with user context

## Deploy API Server on Cloud Run
