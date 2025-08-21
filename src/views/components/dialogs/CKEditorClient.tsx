import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), {
  ssr: false
})

type Props = {
  data: string
  onChange: (data: string) => void
  placeholder?: string
  toolbar?: string[]
}

export default function CKEditorClient({ data, onChange, placeholder, toolbar }: Props) {
  const [ClassicEditor, setClassicEditor] = useState<any>(null)

  useEffect(() => {
    import('@ckeditor/ckeditor5-build-classic').then(mod => {
      setClassicEditor(mod.default)
    })
  }, [])

  if (typeof window === 'undefined' || !ClassicEditor) {
    return null
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onChange={(_, editor) => {
        onChange(editor.getData())
      }}
      config={{
        toolbar: toolbar ?? [
          'heading', '|',
          'bold', 'italic', 'underline', 'strikethrough', '|',
          'alignment', '|',
          'bulletedList', 'numberedList', '|',
          'indent', 'outdent', '|',
          'link', 'blockQuote', 'insertTable', 'mediaEmbed', '|',
          'undo', 'redo'
        ],
        placeholder: placeholder ?? ''
      }}
    />
  )
}
