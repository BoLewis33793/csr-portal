import UsersNav from "@/components/navigation/users-nav";
import UsersListNav from "@/components/user/users-list-nav";
import UsersList from "@/components/user/users-list";

export default function Page() {
    return (
      <div className="flex flex-col h-screen">
        <UsersNav />
        <UsersListNav />
        <UsersList />
      </div>
    );
  }