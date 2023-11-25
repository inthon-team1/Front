import { Suspense } from 'react'
import SuspenseLoader from './SuspenseLoader'

const Loader = (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
)

export default Loader
