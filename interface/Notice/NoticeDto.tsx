import { NoticePageListDto } from "./NoticePageListDto";

export interface NoticeDto {
    pageExist: boolean,
    currentPage: number,
    startPage: number,
    endPage: number,
    totalPage: number,
    noticePageList: NoticePageListDto
}