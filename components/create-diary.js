import JoditEditor from "jodit-react";


export default function CreateDiary(props) {

    return (
        <JoditEditor
            // ref={editor}
            value={props.content}
            // config={config}
            // tabIndex={1} // tabIndex of textarea
            // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(val) => props.setValue(val)}
        />
    )
}