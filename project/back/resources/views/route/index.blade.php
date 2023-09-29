@extends('layouts.app')

@section('template_title')
    Route
@endsection

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; justify-content: space-between; align-items: center;">

                            <span id="card_title">
                                {{ __('Route') }}
                            </span>

                             <div class="float-right">
                                <a href="{{ route('routes.create') }}" class="btn btn-primary btn-sm float-right"  data-placement="left">
                                  {{ __('Create New') }}
                                </a>
                              </div>
                        </div>
                    </div>
                    @if ($message = Session::get('success'))
                        <div class="alert alert-success">
                            <p>{{ $message }}</p>
                        </div>
                    @endif

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="thead">
                                    <tr>
                                        <th>No</th>
                                        
										<th>Sede Id</th>
										<th>Number</th>
										<th>Created By</th>
										<th>Modified By</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($routes as $route)
                                        <tr>
                                            <td>{{ ++$i }}</td>
                                            
											<td>{{ $route->sede_id }}</td>
											<td>{{ $route->number }}</td>
											<td>{{ $route->created_by }}</td>
											<td>{{ $route->modified_by }}</td>

                                            <td>
                                                <form action="{{ route('routes.destroy',$route->id) }}" method="POST">
                                                    <a class="btn btn-sm btn-primary " href="{{ route('routes.show',$route->id) }}"><i class="fa fa-fw fa-eye"></i> {{ __('Show') }}</a>
                                                    <a class="btn btn-sm btn-success" href="{{ route('routes.edit',$route->id) }}"><i class="fa fa-fw fa-edit"></i> {{ __('Edit') }}</a>
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger btn-sm"><i class="fa fa-fw fa-trash"></i> {{ __('Delete') }}</button>
                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {!! $routes->links() !!}
            </div>
        </div>
    </div>
@endsection
