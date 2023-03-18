
interface ChildrenProps {
    children: React.ReactNode;
  }

export default function MainDiv({children} : ChildrenProps){
    return (
        <div className="w-full md:shrink-0 py-5">
            {children}
        </div>
    )
}
