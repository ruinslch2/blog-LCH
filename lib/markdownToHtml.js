import remark from 'remark'
import html from 'remark-html'
import {Remarkable} from 'remarkable';

export default async function markdownToHtml(markdown) {
  // const result = await remark().use(html).process(markdown)
  // console.log('markdown: ', markdown);
  const md = new Remarkable({
      html: true, // Enable HTML tags in source
      xhtmlOut: false, // Use '/' to close single tags (<br />)
      breaks: true, // Convert '\n' in paragraphs into <br>
      // linkify: true, // Autoconvert URL-like text to links

      // Enable some language-neutral replacement + quotes beautification
      typographer: true,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: '“”‘’'
  });
  const result = md.render(markdown.replace(/\n/g, '<br />'));
  return result
}
