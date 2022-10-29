import { useNavigate } from '@remix-run/react'
import Portal from './portal'

interface IProps {
    children: React.ReactNode
    isOpen: boolean
    ariaLabel?: string
    className?: string
}

export default function Modal({
    children,
    isOpen,
    ariaLabel = 'modal-title',
    className = '',
}: IProps) {
    const navigate = useNavigate()

    return isOpen ? (
        <Portal wrapperId="modal">
            <div
                className="fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-80"
                aria-labelledby={ariaLabel}
                role="dialog"
                aria-modal="true"
                onClick={() => navigate('/home')}
            ></div>
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen overflow-hidden">
                <div
                    className={`${className} p-4 bg-gray-200 pointer-events-auto max-h-screen md: rounded-xl`}
                >
                    {children}
                </div>
            </div>
        </Portal>
    ) : null
}
