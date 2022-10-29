import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface IProps {
    children: React.ReactNode
    wrapperId: string
}

const createWrapper = (wrapperId: string) => {
    const wrapper = document.createElement('div')
    wrapper.setAttribute('id', wrapperId)
    document.body.appendChild(wrapper)
    return wrapper
}

export default function Portal({ children, wrapperId }: IProps) {
    const [wrapper, setWrapper] = useState<HTMLElement | null>(null)

    useEffect(() => {
        let element = document.getElementById(wrapperId)
        let created = false

        if (!element) {
            created = true
            element = createWrapper(wrapperId)
        }

        setWrapper(element)

        return () => {
            if (created && element?.parentNode) {
                element.parentNode.removeChild(element)
            }
        }
    }, [wrapperId])

    return wrapper ? createPortal(children, wrapper) : null
}
