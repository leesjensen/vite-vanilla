import React from 'react';
import {NavLink} from 'react-router-dom';
import './topicList.css';

export default function TopicList({topics}) {
  const topicSections: Element[] = [];
  topics.forEach((section) => {
    const topicSection = <TopicSection section={section} />;
    topicSections.push(topicSection);
  });

  return <div>{topicSections}</div>;
}

function TopicSection({section}) {
  const [showTopics, setShowTopics] = React.useState(false);

  const ol: Element[] = [];

  section.topics.forEach((topic) => {
    ol.push(<Topic topic={topic} />);
  });

  if (ol.length > 0) {
    const animate = showTopics ? '' : 'hover:animate-wiggle';
    return (
      <div key={section.title} className='container m-5 p-4 bg-stone-200 rounded-xl dark:bg-stone-800 mx-auto'>
        <h2
          className={animate + ' cursor-pointer font-bold text-2xl p-3 text-stone-900 dark:text-teal-100'}
          onClick={() => setShowTopics(!showTopics)}
        >
          {section.title}
        </h2>
        {showTopics && (
          <div className='block'>
            <ul>{ol}</ul>
          </div>
        )}
      </div>
    );
  }

  return <div></div>;
}

function Topic({topic}) {
  function getDue(dueDate: Date) {
    if (dueDate) {
      const now = new Date();
      const due = now.getTime() < dueDate.getTime();
      return <span className={due ? 'due' : 'past-due'}>({`${dueDate.getMonth() + 1}/${dueDate.getDate()}`})</span>;
    }
    return '';
  }

  return (
    <li key={topic.title}>
      <NavLink className='px-4 hover:animate-pulse ' to={`/page/${topic.path}`}>
        {topic.title}
      </NavLink>{' '}
      {getDue(topic.due)}
    </li>
  );
}
