import { Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function QuillEditorCustom({
  onChange,
  value,
}: {
  onChange: (data: string) => void;
  value: string | null;
}) {
  const [isHtml, setIsHtml] = useState<boolean>(true);
  return (
    <div>
      <Button onClick={() => setIsHtml((prev) => !prev)}>Swap Html</Button>
      {!isHtml ? (
        <Textarea
          rows={15}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <ReactQuill
          value={value || ""}
          onChange={(_content, _delta, _source, editor) => {
            onChange(editor.getHTML());
          }}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["color", "link", "image", "video"],
              ["clean"],
            ],
          }}
        />
      )}
    </div>
  );
}

export default QuillEditorCustom;
