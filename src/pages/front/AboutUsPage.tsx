
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
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Alex has over 15 years of experience in network security and founded Network Guardian to make advanced security tools accessible to everyone. With a background in ethical hacking and cybersecurity, Alex leads our vision of creating a safer digital world.",
    avatarUrl: "/placeholder.svg"
  },
  {
    name: "Sam Rivera",
    role: "CTO",
    bio: "Sam leads our technical development with expertise in cybersecurity and a passion for creating intuitive security solutions. Having previously worked at major tech companies securing enterprise networks, Sam brings invaluable expertise to our product development.",
    avatarUrl: "/placeholder.svg"
  },
  {
    name: "Jamie Chen",
    role: "Head of Security Research",
    bio: "Jamie's extensive background in threat intelligence helps shape our approach to identifying and mitigating network vulnerabilities. With a PhD in Computer Science and numerous publications on network security, Jamie ensures our products stay ahead of emerging threats.",
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              Network Guardian was founded in 2019 by Alex Johnson, an experienced network security professional who 
              recognized the need for more accessible security tools in an increasingly connected world.
            </p>
            <p className="text-lg mb-6 text-muted-foreground">
              What began as a simple tool for personal network monitoring has evolved into a comprehensive toolkit 
              used by individuals and organizations worldwide to secure their networks and protect their digital assets.
            </p>
            <p className="text-lg mb-6 text-muted-foreground">
              Today, our team of dedicated security experts, developers, and user experience professionals work 
              together to continuously improve Network Guardian, making it more powerful, intuitive, and responsive 
              to the evolving needs of our users.
            </p>
            <p className="text-lg text-muted-foreground">
              Our commitment to democratizing network security remains at the core of everything we do as we continue 
              to grow and expand our capabilities. We believe everyone deserves access to powerful, easy-to-use security tools.
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
