import React, { useState } from 'react'

function meetRoom() {
  // State for Participants
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Sulammita', status: 'online' },
    { id: 2, name: 'Dennis Ivy', status: 'offline' },
    { id: 3, name: 'Shahriar P. Shuvo', status: 'online' },
    { id: 4, name: 'John Doe', status: 'online' },
    { id: 5, name: 'Jane Smith', status: 'offline' },
  ]);

  // State for Messages
  const [messages, setMessages] = useState([
    { id: 1, name: 'Sulammita', text: 'Hello everyone!', time: '10:00 AM' },
    { id: 2, name: 'Dennis Ivy', text: 'Good morning!', time: '10:05 AM' },
    { id: 3, name: 'Shahriar P. Shuvo', text: 'How is everyone doing?', time: '10:10 AM' },
  ]);

  // State for new message input
  const [newMessage, setNewMessage] = useState('');

  // Handler to add a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        name: 'You',  // Replace with actual user name if needed
        text: newMessage,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <>
      <div className='h-full w-full bg-slate-700 text-white flex flex-row gap-1 p-1'>



        {/* main */}
        <div className='border border-white basis-3/4'>
          <div>
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda asperiores mollitia delectus exercitationem non. Commodi at tenetur quia distinctio alias ipsa veniam molestias maiores id, velit eaque debitis incidunt totam corporis ad ullam sunt animi dolore, similique iusto mollitia voluptates atque nemo vel? Voluptatum earum sunt vero, minus ducimus dignissimos laboriosam voluptates possimus ad voluptatem labore autem nihil dolorem, ipsum repudiandae ratione enim soluta laborum repellendus reprehenderit eaque, fugiat praesentium? Illum esse expedita repellendus accusantium, inventore animi aliquam quibusdam id quo corporis sunt! Impedit, cupiditate excepturi. Ratione amet minima, accusamus sed eveniet cumque veritatis architecto culpa eaque accusantium voluptate aliquam?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa rem saepe in itaque cumque asperiores dignissimos praesentium sapiente nobis nostrum ab obcaecati, aut, recusandae ipsam, exercitationem similique voluptatem cum modi aliquam eius totam. Dolorum amet sed minima magni facere ea deserunt velit necessitatibus nostrum, porro quo voluptate incidunt, totam quia sapiente voluptatum recusandae soluta reiciendis neque quam quasi. Quasi laborum quos odit nostrum doloribus dolorum ab ex consequatur incidunt itaque impedit repellat, esse molestiae! Quaerat, doloremque libero neque explicabo beatae ex aliquam nemo mollitia cum fuga consequuntur? Architecto impedit quo asperiores dolore at perferendis, voluptas nostrum harum sit dolores quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio harum aliquam aut incidunt numquam nisi ut blanditiis cum, voluptates magnam fugiat assumenda ratione veniam porro odit quisquam illo velit facilis in consequuntur id iure excepturi corrupti. Obcaecati veniam ipsum, repellendus impedit consequatur reprehenderit consequuntur a maiores. Eveniet esse error expedita eaque aspernatur, excepturi velit! Qui delectus adipisci aperiam cumque illum corporis nulla quis molestiae ipsa ullam eaque, officia animi beatae impedit est quidem aspernatur odio dolores esse! Earum accusamus, possimus optio enim obcaecati itaque nihil veniam excepturi pariatur inventore minus blanditiis, esse dolor maxime? Molestias vel quam accusantium cupiditate ipsa.
          </div>
          <div>
            button
          </div>
        </div>

        {/* chat/complier /participats */}
        <div className='border border-white basis-1/4'>chat</div>
      </div>
    </>
  )
}

export default meetRoom
