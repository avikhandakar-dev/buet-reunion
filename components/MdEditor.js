import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

const MdEditorLite = ({ onChange }) => {
  const handleImageUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <MdEditor
      onChange={onChange}
      renderHTML={(text) => mdParser.render(text)}
      onImageUpload={handleImageUpload}
      style={{ height: "450px", width: "100%" }}
    />
  );
};

export default MdEditorLite;
