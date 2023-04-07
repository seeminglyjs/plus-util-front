import { DateDto } from "./DateDto"
import { NoticeDto } from "./NoticeDto"

export interface NoticeDetailDto {
    noticeDto: NoticeDto
    dateDto: DateDto
    updateRoleCheck: boolean
}