
interface ChildrenProps {
    children: React.ReactNode;
  }

export default function MajorityDiv({children} : ChildrenProps){
    return (
        <div className="basis-10/12 px-5">
            {children}
        </div>
    )
}
