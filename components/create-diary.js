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

// import React, { useState } from "react";

// const Jodit = React.lazy(() => {
//   return import("jodit-react");
// });

// export default function CreateDiary() {
//     console.log('is: ', isSSR)
//   const [value, setValue] = useState("");
//   const isSSR = typeof window === "undefined";
  
//   return (
//     <Jodit value={value} onChange={(val) => setValue(val)}/>
//   )
// //   return (
// //     <>
// //       {!isSSR && (
// //           <Jodit value={value} onChange={(val) => setValue(val)}/>
// //       )}
// //     </>
// //   );
// };