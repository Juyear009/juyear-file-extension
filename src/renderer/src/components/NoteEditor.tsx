import { history } from '@milkdown/plugin-history'
import styles from './NoteEditor.module.css'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import { defaultValueCtx, Editor, editorViewOptionsCtx, rootCtx } from '@milkdown/kit/core'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { commonmark } from '@milkdown/kit/preset/commonmark'
import { gfm } from '@milkdown/kit/preset/gfm'
import { nord } from '@milkdown/theme-nord'

const EditorComponent = ({ value, onChange }) => {
  useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, value)
        ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
          onChange(markdown)
        })
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            ...prev.attributes,
            spellcheck: 'false',
            autocomplete: 'off'
          }
        }))
      })
      .config(nord)
      .use(commonmark)
      .use(gfm)
      .use(history)
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
