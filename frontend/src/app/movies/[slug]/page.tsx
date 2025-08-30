import MovireDetailPageWrapper from '@/pages/MovieDetailPage/MovireDetailPageWrapper'
import React from 'react'

const page = async (props: any) => {
    const { slug } = await props.params
    console.log(slug, "slug")
    return (
        <>
            <MovireDetailPageWrapper id={slug} />
        </>
    )
}

export default page