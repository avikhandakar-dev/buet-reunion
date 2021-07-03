import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
const mdParser = new MarkdownIt(/* Markdown-it options */);

const MdEditorLite = ({ onChange }) => {
  return (
    <MdEditor
      onChange={onChange}
      renderHTML={(text) => mdParser.render(text)}
      style={{ height: "450px", width: "100%" }}
    />
  );
};

export default MdEditorLite;
