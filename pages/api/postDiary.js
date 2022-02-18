import fs from 'fs';
import TurndownService from 'turndown';
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function diaryToMarkdown(req, res) {
    const data = JSON.parse(req.body);
    let turndownService = new TurndownService();
    let markdown = turndownService.turndown(data.content);
    let introduce = '';
    if (markdown.length > 50) {
        introduce = markdown.substring(0, 50) + '...';
    } else {
        introduce = markdown;
    }

    markdown = `---
    title: '${data.title}'
    excerpt: '${introduce}'
    coverImage: '/assets/blog/dynamic-routing/cover.jpg'
    date: '${new Date().toISOString()}'
    author:
      name: JJ Kasper
      picture: '/assets/blog/authors/jj.jpeg'
    ogImage:
      url: '/assets/blog/dynamic-routing/cover.jpg'
---
` + markdown;
    fs.writeFileSync(`./_posts/${Date.now()}.md`, markdown)
    await cors(req, res)

    res.status(200).json({ text: 'Hello' })
}