import { type Profile } from '@prisma/client'

interface IProps {
    profile: Profile
    className?: string
    onClick?: (...args: any) => any
}

export function UserCircle({
    profile: { firstName, lastName, profilePicture },
    onClick = () => {},
    className = '',
}: IProps) {
    return (
        <div
            className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
            onClick={onClick}
            style={{
                backgroundSize: 'cover',
                ...(profilePicture
                    ? { backgroundImage: `url(${profilePicture})` }
                    : {}),
            }}
        >
            {!profilePicture && (
                <h2>
                    {firstName.charAt(0).toUpperCase()}
                    {lastName.charAt(0).toUpperCase()}
                </h2>
            )}
        </div>
    )
}
