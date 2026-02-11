import './system-prompt.css';
import {type ReactNode} from "react";

export function SystemPrompt({ isOpen, icon, title, description, children }: { isOpen: boolean, icon?: ReactNode, title: string, description?: string, children?: ReactNode }) {
  return <>
    <div className={'system-prompt-backdrop ' + (isOpen ? 'system-prompt-backdrop--open' : '')}></div>
    <div className={'system-prompt ' + (isOpen ? 'system-prompt--open' : '')}>
      {icon}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  </>
}