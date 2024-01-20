import { FormControl } from "@chakra-ui/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function CKEditorCustom({
  onChange,
  value,
}: {
  onChange: (data: string) => void;
  value: string | null;
}) {
  return (
    <FormControl height="300px">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </FormControl>
  );
}

export default CKEditorCustom;
