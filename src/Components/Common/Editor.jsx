// src/components/Editor.js
import React, { useMemo, useState, useCallback,useEffect } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Transforms, Editor as SlateEditor } from 'slate';
import { withHistory } from 'slate-history';

const Editor = ({ initialValue, onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);
useEffect(()=>{
  console.log("before value")
  console.log(value)
  console.log("after value")
},[value])
  const handleChange = newValue => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'case':
        return <CaseElement {...props} />;
      case 'principle':
        return <PrincipleElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  const toggleCase = () => {
    const [match] = SlateEditor.nodes(editor, {
      match: n => n.type === 'case',
    });

    Transforms.setNodes(
      editor,
      { type: match ? 'paragraph' : 'case' },
      { match: n => SlateEditor.isBlock(editor, n) }
    );
  };

  const togglePrinciple = () => {
    const [match] = SlateEditor.nodes(editor, {
      match: n => n.type === 'principle',
    });

    Transforms.setNodes(
      editor,
      { type: match ? 'paragraph' : 'principle' },
      { match: n => SlateEditor.isBlock(editor, n) }
    );
  };

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <div className="toolbar">
        <button onMouseDown={event => { event.preventDefault(); toggleCase(); }}>
          Case
        </button>
        <button onMouseDown={event => { event.preventDefault(); togglePrinciple(); }}>
          Principle
        </button>
        {/* Other buttons */}
      </div>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} placeholder="Enter some text..." className="p-4 border border-gray-300 rounded" />
      <CaseList value={value} />
    </Slate>
  );
};

const CaseElement = props => (
  <p {...props.attributes} style={{ color: 'red', fontWeight: 'bold' }}>
    {props.children}
  </p>
);

const PrincipleElement = props => (
  <p {...props.attributes} style={{ color: 'blue', fontStyle: 'italic' }}>
    {props.children}
  </p>
);

const DefaultElement = props => (
  <p {...props.attributes}>
    {props.children}
  </p>
);

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const CaseList = ({ value }) => {
  const cases = value
    .filter(node => node.type === 'case')
    .map((node, index) => (
      <div key={index}>
        <strong>Case {index + 1}:</strong> {node.children.map(n => n.text).join(' ')}
        <br />
        <em>Principle:</em> {node.children.map(n => n.text.split('-')[1] || '').join(' ')}
      </div>
    ));

  return (
    <div className="case-list">
      <h3 className="text-lg font-bold">Cases</h3>
      {cases.length > 0 ? cases : <p>No cases added.</p>}
    </div>
  );
};

export default Editor;
