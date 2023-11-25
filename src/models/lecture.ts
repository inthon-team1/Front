import type { AxiosResponse } from 'axios'

export interface Lecture {
  titleKR: string
  descriptionKR: string
  titleEN: string
  descriptionEN: string
  id: string
  courseID: string
  lecturerName: string
  year: number
  semester: number
  section: number
}

export interface KoreanLecture {
  titleKR: string
  descriptionKR: string
  courseID: string
  year: number
  semester: number
  section: number
}

export interface LectureAPIResponse extends AxiosResponse {
  lectures: Lecture[]
}
