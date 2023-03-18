
interface ChildrenProps {
    children: React.ReactNode;
  }

export default function HalfDiv({children} : ChildrenProps){
    return (
        <div className="basis-1/2 px-5">
            {children}
        </div>
    )
}
