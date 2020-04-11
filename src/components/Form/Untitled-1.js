
render() {
    return (
        <div>
            <form>
              <label>
                Имя:
                <input type="text" />
              </label>
              <input type="submit" value="Отправить" />
            </form>
            <section className="information">
                <div>Погода в городе Э</div>
                <div>За окном</div>
                <div>Температура</div>
                <div>Влажность</div>    
                <div>Ветер</div>
            </section>
        </div>
    );
}
}