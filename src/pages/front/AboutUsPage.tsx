
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from '@/components/ui/card';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Hard Pansara",
    role: "Developer",
    bio: "Hard is an experienced developer with expertise in network security and a passion for creating intuitive security tools. He focuses on backend architecture and security protocol implementation.",
    avatarUrl: "/placeholder.svg"
  },
  {
    name: "Yug Thacker",
    role: "Developer",
    bio: "Yug specializes in frontend development and user experience design. His work ensures that our security tools are accessible and easy to use for all users regardless of their technical background.",
    avatarUrl: "/placeholder.svg"
  },
  {
    name: "Aaditya Thacker",
    role: "Developer",
    bio: "Aaditya leads our threat intelligence research, helping to identify and mitigate network vulnerabilities. His technical expertise in cybersecurity is invaluable to the development of our security features.",
    avatarUrl: "/placeholder.svg"
  },
  {
    name: "Dev Koshti",
    role: "Developer",
    bio: "Dev focuses on system architecture and performance optimization. His work ensures that our security applications run efficiently and can scale to meet the needs of both individual users and organizations.",
    avatarUrl: "/placeholder.svg"
  }
];

const AboutUsPage: React.FC = () => {
  return (
    <FrontLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Our Team</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Meet the dedicated professionals behind Network Guardian who are passionate about network security and committed to protecting your digital assets
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden h-full">
                <CardContent className="p-6 flex flex-col items-center h-full">
                  <Avatar className="h-32 w-32 mb-6">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously evolve our toolkit to stay ahead of emerging security threats and technologies.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards of ethics and transparency in all our operations.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
              <p className="text-muted-foreground">
                We believe powerful security tools should be intuitive and accessible to users of all skill levels.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
              <p className="text-muted-foreground">
                Our users' security needs drive our development priorities and support practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6 text-muted-foreground">
              <strong>The Inspiration Behind Our Tool</strong><br />
              It all started when we noticed an unfamiliar device connected to our home network. Concerned about potential security risks, we manually checked connected devices, only to realize how time-consuming and inefficient the process was. This raised a crucial question—how many people unknowingly have unauthorized devices on their networks, exposing them to data theft and privacy breaches?
            </p>
            <p className="text-lg mb-6 text-muted-foreground">
              <strong>Solution</strong><br />
              Determined to find a solution, we developed a tool that automates the detection of untrusted devices by scanning network details, identifying open ports, and enabling users to take action against potential threats. By making this process accessible and efficient, we aim to empower individuals and organizations to protect their networks and ensure digital privacy with ease.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, our team of dedicated security experts, developers, and user experience professionals work 
              together to continuously improve Network Guardian, making it more powerful, intuitive, and responsive 
              to the evolving needs of our users.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            "To empower individuals and organizations with accessible, powerful network security tools that protect 
            digital assets and create a safer connected world."
          </p>
        </div>
      </section>
    </FrontLayout>
  );
};

export default AboutUsPage;
