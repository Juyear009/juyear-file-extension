import styles from './NoteEditor.module.css'
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { commonmark } from '@milkdown/preset-commonmark'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'

const EditorComponent = ({ value, onChange }) => {
  useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, value)

        ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
          onChange(markdown)
        })
      })
      .use(commonmark)
      .use(listener)
  }, [])

  return <Milkdown />
}

export const NoteEditor = ({ value, onChange }) => {
  return (
    <MilkdownProvider>
      <div className={styles.editorWrapper}>
        <EditorComponent value={value} onChange={onChange}></EditorComponent>
      </div>
    </MilkdownProvider>
  )
}
