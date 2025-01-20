import { Size } from "@/types/size.type"
import { AvatarProps } from "./avatar.typse"
import classNames from "classnames"
import Image from "next/image"
import './avatar.scss'
const sizeClasses: Record<Size, number> = {
    tiny: 40,
    small: 50,
    normal: 70,
    large: 120,
}
export const Avatar: React.FC<AvatarProps> = ({
    variant = 'primary',
    className,
    size = 'normal',
    src,
    alt = ''
}) => {
    const classes = classNames('avatar', className, {
        [`avatar-${variant}`]: variant,
        [`${sizeClasses[size]}`]:size,
    })
    return (
        <div className={classes} style={{width:sizeClasses[size], height:sizeClasses[size]}}>
            {
                src?(
                    <Image src={src} width={sizeClasses[size]} height={sizeClasses[size]} alt={alt}/>
                ):(
                    <></>
                )
            }
        </div>
    )
}
