interface IRLogin {
    access_token: string;
    expires_in: number;
    token_type: string;
}

interface IRUserInfo {
    name: string;
    role: userInfoRolesType;
}

type IRVenues = IVenue[];
type IRRooms = IRoom[];
