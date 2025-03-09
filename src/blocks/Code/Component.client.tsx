'use client'

import { Highlight, themes } from 'prism-react-renderer'
import * as React from 'react'
import { CopyButton } from './CopyButton'

interface CodeProps {
  code: string
  language?: string
  showLineNumbers?: boolean
}

export function Code({ 
  code, 
  language = 'tsx', 
  showLineNumbers = true 
}: CodeProps) {
  if (!code) return null

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-black">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/20">
        <div className="text-xs font-medium text-muted-foreground">
          {language.toUpperCase()}
        </div>
        <CopyButton code={code} />
      </div>
      <Highlight code={code.trim()} language={language} theme={themes.vsDark}>
        {({ getLineProps, getTokenProps, tokens }) => (
          <pre className="p-4 text-xs overflow-x-auto">
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ className: 'table-row', line })}>
                  {showLineNumbers && (
                    <span className="table-cell select-none text-right pr-4 text-muted-foreground w-7">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}
