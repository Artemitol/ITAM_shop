import { SVGProps } from "react"

type iconProps = SVGProps<SVGSVGElement> & {
    size?: number
}

export function BasketIcon({ width, height, size = 20 }: iconProps) {
    return (
        <svg
            width={width || size}
            height={height || size}
            viewBox='0 0 39 38'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M39 22.2796V10.0681C39 8.38077 38.2699 6.84946 37.1063 6.06917L28.7328 0.499872C27.7213 -0.163373 26.5197 -0.163373 25.5158 0.499872L19.5 4.45983L13.4842 0.490118C12.4803 -0.163373 11.2787 -0.163373 10.2672 0.490118L1.89372 6.06917C0.730109 6.84946 0 8.38077 0 10.0681V23.138C0 24.8448 0.737715 26.3859 1.92414 27.1564L17.9181 37.5148C18.4124 37.8366 18.9524 38.0024 19.5 38.0024C20.0476 38.0024 20.5876 37.8366 21.0819 37.5148L36.8173 27.3223L35.494 24.64L20.7397 34.1985V21.7822L36.5359 10.9265V22.2796H39ZM16.4503 6.19597C16.4731 6.43006 16.4351 6.66414 16.3438 6.88848C16.1004 7.48344 15.53 7.71753 15.0661 7.39566L12.1305 5.40593C12.062 5.35716 11.9784 5.35716 11.9099 5.40593L8.3202 7.8931C8.1757 8.00039 8.0236 8.0394 7.87149 8.0394C7.52925 8.0394 7.20222 7.81507 7.0273 7.40542C7.00449 7.34689 6.98167 7.27862 6.97406 7.2201C6.8752 6.87872 6.91322 6.50809 7.04251 6.20572C7.12617 6.02041 7.25546 5.86435 7.41517 5.7473L11.0277 3.24063C11.6741 2.83098 12.4043 2.83098 13.0127 3.25039L15.9559 5.24012C16.1917 5.40593 16.3514 5.67903 16.4199 5.98139C16.4351 6.04967 16.4503 6.1277 16.4503 6.19597ZM3.03452 24.3377C2.68467 24.1036 2.46412 23.6451 2.46412 23.138V10.9265L18.2755 21.8017V34.2083L3.03452 24.3377Z'
                fill='#1E1E1E'
            />
        </svg>
    )
}

export function UserIcon({ width, height, size = 20 }: iconProps) {
    return (
        <svg
            width={width || size}
            height={height || size}
            viewBox='0 0 42 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M39.8989 45.5999L39.8996 37.5006C39.9 33.0268 36.2734 29.3999 31.7996 29.3999H10.2013C5.7281 29.3999 2.10176 33.0258 2.10125 37.499L2.10034 45.5999M29.1003 10.4999C29.1003 14.9734 25.4738 18.5999 21.0003 18.5999C16.5268 18.5999 12.9003 14.9734 12.9003 10.4999C12.9003 6.02639 16.5268 2.3999 21.0003 2.3999C25.4738 2.3999 29.1003 6.02639 29.1003 10.4999Z'
                stroke='white'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export function PacketIcon({ width, height, size = 20 }: iconProps) {
    return (
        <svg
            width={width || size}
            height={height || size}
            viewBox='0 0 48 50'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M32.0999 16.8998V10.1498C32.0999 5.6763 28.4734 2.04981 23.9999 2.0498C19.5264 2.0498 15.8999 5.6763 15.8999 10.1498V16.8998M7.63627 47.9498H40.3635C43.2555 47.9498 45.5999 45.649 45.5999 42.8108L42.2454 15.5497C42.2454 12.7115 39.901 10.4107 37.009 10.4107H10.3363C7.4443 10.4107 5.0999 12.7115 5.0999 15.5497L2.3999 42.8108C2.3999 45.649 4.7443 47.9498 7.63627 47.9498Z'
                stroke='white'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export function WishListIcon({ width, height, size = 20 }: iconProps) {
    return (
        <svg
            width={width || size}
            height={height || size}
            viewBox='0 0 39 38'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M39 22.2821V10.0706C39 8.38322 38.2699 6.8519 37.1063 6.07162L28.7328 0.502313C27.7213 -0.160931 26.5197 -0.160931 25.5158 0.502313L19.5 4.46227L13.4842 0.492559C12.4803 -0.160931 11.2787 -0.160931 10.2672 0.492559L1.89372 6.07162C0.730109 6.8519 0 8.38322 0 10.0706V23.1404C0 24.8473 0.737715 26.3884 1.92414 27.1589L17.9181 37.5172C18.4124 37.8391 18.9524 38.0049 19.5 38.0049C20.0476 38.0049 20.5876 37.8391 21.0819 37.5172L36.8173 27.3247L35.494 24.6425L20.7397 34.201V21.7847L36.5359 10.9289V22.2821H39ZM16.4503 6.19841C16.4731 6.4325 16.4351 6.66658 16.3438 6.89092C16.1004 7.48589 15.53 7.71997 15.0661 7.3981L12.1305 5.40837C12.062 5.3596 11.9784 5.3596 11.9099 5.40837L8.3202 7.89554C8.1757 8.00283 8.0236 8.04184 7.87149 8.04184C7.52925 8.04184 7.20222 7.81751 7.0273 7.40786C7.00449 7.34934 6.98167 7.28106 6.97406 7.22254C6.8752 6.88116 6.91322 6.51053 7.04251 6.20817C7.12617 6.02285 7.25546 5.86679 7.41517 5.74975L11.0277 3.24307C11.6741 2.83342 12.4043 2.83342 13.0127 3.25283L15.9559 5.24256C16.1917 5.40837 16.3514 5.68147 16.4199 5.98383C16.4351 6.05211 16.4503 6.13014 16.4503 6.19841ZM3.03452 24.3401C2.68467 24.106 2.46412 23.6476 2.46412 23.1404V10.9289L18.2755 21.8042V34.2107L3.03452 24.3401Z'
                fill='#ffffff'
            />
        </svg>
    )
}

export function BackIcon({ width, height, size = 20, ...rest }: iconProps) {
    return (
        <svg
            width={width || size}
            height={height || size}
            viewBox='0 0 1024 1024'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            {...rest}
        >
            <path d='M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z' />
        </svg>
    )
}

export function RemoveIcon({ width, height, size = 38, ...rest }: iconProps) {
    return (
        <svg
            width={width || size + 1}
            height={height || size}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...rest}
        >
            <path
                d='M10 12V17'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M14 12V17'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M4 7H20'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}
