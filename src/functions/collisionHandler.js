function checkIntersection(r1, r2) {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
}

const collisionHandler = (ents) => {
    ents.map((entityOne, index) => {
        ents.map((entityTwo, i) => {
            if (entityOne !== entityTwo) {
                let int =
                    checkIntersection(
                        { x: entityOne.position.x, y: entityOne.position.y, width: 250, height: 250 },
                        { x: entityTwo.position.x, y: entityTwo.position.y, width: 250, height: 250 })

                console.log(int)
            }
        })
    })
}

export default collisionHandler