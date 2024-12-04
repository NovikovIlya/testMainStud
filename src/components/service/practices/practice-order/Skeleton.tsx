import { Skeleton, Space } from 'antd'

export const SkeletonPage = () => {
	return (
		
         <>
			<Skeleton.Button active size="large" block style={{width:'1000px',marginBottom:'20px'}} />
			<div className='flex  w-[1000px]'>
				<Skeleton.Button active style={{width:'100px',marginBottom:'10px'}}  size="small" block />
				<Skeleton.Button active style={{width:'100px',marginBottom:'10px'}}  size="small" block />
				<Skeleton.Button active style={{width:'100px',marginBottom:'10px'}}  size="small" block />
			</div>
			<div className='flex w-[1000px]'>
				<Skeleton.Button active style={{width:'100px',marginBottom:'10px'}}  size="small" block />
				<Skeleton.Button active style={{width:'100px',marginBottom:'10px'}}  size="small" block />
				<Skeleton.Button active style={{width:'100px',marginBottom:'10px'}}  size="small" block />
			</div>
			<Space direction="vertical">
					
					<Skeleton.Button active size="large" block />
			</Space>
			<Skeleton.Button active size="large" block style={{width:'1000px',marginBottom:'10px',height:'300px'}} />
		</>
	)
}
