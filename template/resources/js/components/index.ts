import type { DefineComponent } from 'vue'
import ModuleShellComponent from './ModuleShell.vue'

export interface ModuleShellProps {
    eyebrow?: string
    title: string
    description?: string
}

export const ModuleShell = ModuleShellComponent as DefineComponent<ModuleShellProps>
