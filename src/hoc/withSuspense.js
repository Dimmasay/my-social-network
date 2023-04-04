import {Suspense} from "react";

export function withSuspense (Component) {
    return (props) => {
        return <Suspense fallback={<div>Завантаження...</div>}>
            <Component {...props}/>
        </Suspense>
    }
}