import { useEffect, useState } from "react";



export default function MyPage (){
    const [menuInfo, setMenuInfo] = useState(null);
  
    useEffect(() => {
      // 최초에만 DB에서 메뉴 정보를 가져옴
      const fetchMenuInfo = async () => {
        const response = await fetch('API 엔드포인트'); // DB에서 데이터를 가져오는 API 엔드포인트를 지정해야 합니다.
        const data = await response.json();
        setMenuInfo(data);
      };
  
      if (!menuInfo) {
        fetchMenuInfo();
      }
    }, []);
  
    // ...
  
    return (
     <div></div>
    )
}  