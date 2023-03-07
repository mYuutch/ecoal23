import { render } from '@testing-library/react';
import Articles from '../Articles/Articles';

export default function Dashboard() {

    function addArticle() {

        render (
            <div>
                <h2>Add an Article</h2>
                <form>
                    <input type="text" placeholder="Title*" />
                    <input type="text" placeholder="Content*" />
                    <input type="text" placeholder="Thumbnail*" />
                    <input type="text" placeholder="Media (URL)" />
                    <input type="text" placeholder="Lead Story*" />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <button className='btn' onClick={addArticle}>Add Article</button>
            <Articles />
        </div>
    )
}