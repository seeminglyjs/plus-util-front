
interface ChildrenProps {
    children: React.ReactNode;
  }

export default function MainSubDiv({children} : ChildrenProps){
    return (
        <div className="container mx-auto">
            {children}
        </div>
    )
}
