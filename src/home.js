import React from 'react';
import ProfilePic from './profilepic';
import { HashRouter, Route } from 'react-router-dom';

export default function Home() {

    return (
        <div className="home">
            <h1 style = {{fontSize: '100px'}}>Discover Berlin</h1>
            <p className="berlin-paragraph">Berlin, Germany’s capital, dates to the 13th century. Reminders of the city's turbulent 20th-century history include its Holocaust memorial and the Berlin Wall's graffitied remains. Divided during the Cold War, its 18th-century Brandenburg Gate has become a symbol of reunification. The city's also known for its art scene and modern landmarks like the gold-colored, swoop-roofed Berliner Philharmonie, built in 1963.</p>
        </div>
    );
}
