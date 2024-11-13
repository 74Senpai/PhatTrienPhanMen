import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './CSS/TextEditor.css'; // Add custom CSS styles

const TextEditor1 = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div className="text-editor-container">
      <div className="toolbar">
        {/* Inline styles */}
        <button onClick={() => toggleInlineStyle('BOLD')}>Bold</button>
        <button onClick={() => toggleInlineStyle('ITALIC')}>Italic</button>
        <button onClick={() => toggleInlineStyle('UNDERLINE')}>Underline</button>
        <button onClick={() => toggleInlineStyle('CODE')}>Monospace</button>

        {/* Block styles */}
        <button onClick={() => toggleBlockType('header-one')}>H1</button>
        <button onClick={() => toggleBlockType('header-two')}>H2</button>
        <button onClick={() => toggleBlockType('header-three')}>H3</button>
        <button onClick={() => toggleBlockType('header-four')}>H4</button>
        <button onClick={() => toggleBlockType('header-five')}>H5</button>
        <button onClick={() => toggleBlockType('header-six')}>H6</button>
        <button onClick={() => toggleBlockType('blockquote')}>Blockquote</button>
        <button onClick={() => toggleBlockType('unordered-list-item')}>UL</button>
        <button onClick={() => toggleBlockType('ordered-list-item')}>OL</button>
        <button onClick={() => toggleBlockType('code-block')}>Code Block</button>
      </div>
      <div className="editor">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          placeholder="Tell a story..."
        />
      </div>
    </div>
  );
};

export default TextEditor1;
