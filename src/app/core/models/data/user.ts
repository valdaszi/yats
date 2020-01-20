export interface User {
  id: string
  displayName: string
  photoURL: string
  email: string
  roles: {
    admin: boolean,
    teacher: boolean,
    student: boolean
  }
}
