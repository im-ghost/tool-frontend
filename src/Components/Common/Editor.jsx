import React, { useCallback, useMemo } from 'react'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const RichTextExample = () => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}






// src/components/Editor.js
import React, { useMemo, useState, useCallback,useEffect } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Transforms, Editor as SlateEditor } from 'slate';
import { withHistory } from 'slate-history';

const Editor = ({ initialValue, onChange }) => {
  
  const [value, setValue] = useState(initialValue);
  useEffect(()=>{
  console.log(value)
},[])
  const handleChange = newValue => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])


}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties: Partial<SlateElement>
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}
const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}


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
    <Slate editor={editor} initialValue={value} onChange={handleChange}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>
      <div className="toolbar">
        <button onMouseDown={event => { event.preventDefault(); toggleCase(); }}>
          Case
        </button>
        <button onMouseDown={event => { event.preventDefault(); togglePrinciple(); }}>
          Principle
        </button>
        
      </div>
      <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder="Enter some text..." className="p-4 border border-gray-300 rounded"
       spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}/>
      <CaseList value={value} />
    </Slate>
  );
};

const CaseElement = props => (
  <p {...props.attributes} style={{ color: 'red', fontWeight: 'bold', backgroudColor: 'indigo' }}>
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
