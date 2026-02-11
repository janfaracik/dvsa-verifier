import './system-prompt.css';
import type {ReactNode} from "react";

export function SystemPrompt({ isOpen, title, description, children }: { isOpen: boolean, title: string, description?: string, children?: ReactNode }) {
  return <div className={'system-prompt ' + (isOpen ? 'system-prompt--open' : '')}>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    {children}
  </div>
}