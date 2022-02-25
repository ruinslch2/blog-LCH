import JoditEditor from "jodit-react";


export default function CreateDiary(props) {
    const config = {
        useSearch: false,
        spellcheck: false,
        enter: 'P',
        defaultMode: '1',
        toolbarAdaptive: false,
        toolbarSticky: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        minHeight: 30,
        minWidth: null,
        buttons:
            'paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,|,font,brush,,link,|,align,undo,redo,image',
        editorCssClass: 'alic',
        iframeStyle: 'table{width:100%;border-collapse:collapse}',
        uploader: {
            url:"/api/upload",
            insertImageAsBase64URI: true
          },
          filebrowser: {
            ajax: {
              url: "/api/file/files",
            },
            uploader: {
               url:"/api/upload"
            },
          },
    };
    return (
        <JoditEditor
            // ref={editor}
            value={props.content}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            onBlur={newContent => props.setValue(newContent)} // preferred to use only this option to update the content for performance reasons
            //onChange={(val) => props.setValue(val)}
        />
    )
}