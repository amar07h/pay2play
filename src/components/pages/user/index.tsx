"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "./profile.card";
import ProfileTab from "./profile.tab";
import OrderTab from "./order.tab";
import Whichlist from "./whichlist.tab";
import SettingTab from "./setting.tab";
interface Profile{
    name: string,
    email: string, 
    phone: string,
    whatsapp: string, 
    avatar: string,
    created_at: string,
  }

export default function ProfilePage(props: {
  profile: Profile;
}) {

  return (
    <>
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* User Profile Summary */}
            <ProfileCard user={props.profile} />

            {/* User Profile Tabs */}
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8 bg-gaming-dark/50">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="whichlist">Whichlist</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <ProfileTab user={props.profile} />
                </TabsContent>

                <TabsContent value="orders">
                  <OrderTab />
                </TabsContent>

                <TabsContent value="whichlist">
                  {" "}
                  <Whichlist />
                </TabsContent>

                <TabsContent value="settings">
                  <SettingTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};