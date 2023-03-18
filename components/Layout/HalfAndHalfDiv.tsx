
interface ChildrenProps {
    children: React.ReactNode;
  }

export default function HalfAndHalfDiv({children} : ChildrenProps){
    return (
        <div className="basis-1/4 px-5">
            {children}
        </div>
    )
}
