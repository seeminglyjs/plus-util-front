
interface ChildrenProps {
    children: React.ReactNode;
  }

export default function ContentColDiv({children} : ChildrenProps){
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}
